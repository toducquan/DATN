import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/enums/gender.enum';
import { Region } from 'src/enums/region.enum';
import { Repository } from 'typeorm';
import { Building } from '../buildings/entities/building.entity';
import { RoomSwap } from '../room-swap/entities/room-swap.entity';
import { User } from '../users/entity/users.entity';
import { CreateRoomDto, QueryRoomDto } from './dto/create-room.dto';
import { DeleteStudentInRoomDto, UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepo: Repository<Room>,
    @InjectRepository(Building)
    private buildingRepo: Repository<Building>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(RoomSwap)
    private roomSwapRepo: Repository<RoomSwap>,
  ) {}
  async create(payload: CreateRoomDto) {
    const building = await this.buildingRepo.findOne({
      where: {
        id: payload.buildingId,
      },
    });
    const manage = await this.userRepo.findOne({
      where: {
        id: payload.managerId,
      },
    });
    return await this.roomRepo.save({
      ...payload,
      building: building,
      manager: manage,
    });
  }

  async findAll(payload: QueryRoomDto) {
    const rooms = await this.roomRepo.find({
      where: {
        building: {
          id: payload.buildingId,
        },
      },
      relations: ['manager', 'users'],
    });
    return rooms;
  }

  async findOne(id: string) {
    return await this.roomRepo.findOne({
      where: {
        id: id,
      },
      relations: ['manager', 'users'],
    });
  }

  async update(id: string, payload: UpdateRoomDto) {
    const room = await this.roomRepo.findOne({
      where: {
        id: id,
      },
    });
    if (payload.managerId) {
      const manager = await this.userRepo.findOne({
        where: {
          id: payload.managerId,
        },
      });
      room.manager = manager;
    }
    return await this.roomRepo.save({
      ...room,
      ...payload,
    });
  }

  async deleteStudent(payload: DeleteStudentInRoomDto) {
    await Promise.all(
      payload.students.map(async (item) => {
        const user = await this.userRepo.findOne({
          where: {
            id: item,
          },
        });
        await this.userRepo.save({
          ...user,
          room: null,
        });
      }),
    );
    return {
      message: 'Update Successfully',
    };
  }

  async findSuitableRoomForStudent(studentId: string) {
    const currentUser = await this.userRepo.findOne({
      where: {
        id: studentId,
      },
      relations: ['hobbies'],
    });
    const fullTextSearch = [];
    if (currentUser.gender == Gender.Female) {
      fullTextSearch.push(`room.onlyFemale = 1`);
    }
    if (currentUser.region == Region.Foreign) {
      fullTextSearch.push(`room.onlyForeign = 1`);
    }
    const rooms = await this.roomRepo
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.users', 'user')
      .where(fullTextSearch.join(' and '))
      .getMany();

    const checkSuitableHobbies = await this.checkSuitableHobby(
      currentUser,
      rooms,
    );
    const checkSuitableMajor = await this.checkSuitableMajor(
      currentUser,
      rooms,
    );
    const checkSuitableAddress = await this.checkSuitableAddress(
      currentUser,
      rooms,
    );
    const checkSuitableReligion = await this.checkSuitableReligion(
      currentUser,
      rooms,
    );
    const finalData: any = {};
    for (const key in checkSuitableHobbies) {
      finalData[key] =
        checkSuitableAddress[key] +
        checkSuitableHobbies[key] +
        checkSuitableMajor[key] +
        checkSuitableReligion[key];
    }
    const sortPoint: any = [];
    for (let i = 0; i <= 2; i++) {
      let maxValue = 0;
      let maxKey = '';
      for (const key in finalData) {
        if (finalData[key] >= maxValue) {
          maxValue = finalData[key];
          maxKey = key;
        }
      }
      sortPoint.push({
        roomId: maxKey,
        point: maxValue,
      });
      finalData[maxKey] = -1;
    }
    return sortPoint;
  }

  async checkSuitableHobby(user: User, rooms: Room[]) {
    const userHobby = user.hobbies.map((item) => {
      return item.id;
    });
    const roomWithHobbies: any = {};
    await Promise.all(
      rooms.map(async (room: Room) => {
        let totalPoint = 0;
        const userHobbiesInRoom: string[] = [];

        //get all hobbies of all user in room
        await Promise.all(
          room.users.map(async (user) => {
            const userWithHobby = await this.userRepo.findOne({
              where: {
                id: user.id,
              },
              relations: ['hobbies'],
            });
            userWithHobby.hobbies?.map((item) => {
              userHobbiesInRoom.push(item.id);
            });
          }),
        );
        //compare with hobbies of current user
        userHobbiesInRoom.map((item) => {
          if (userHobby.includes(item)) totalPoint += 1;
        });

        roomWithHobbies[room.id] = totalPoint;
      }),
    );
    return roomWithHobbies;
  }

  async checkSuitableMajor(user: User, rooms: Room[]) {
    const roomWithMajor: any = {};
    rooms.map(async (room) => {
      let totalPoint = 0;

      //get major of all users in room
      const userMajorInRoom = [];
      room.users.map((user) => {
        userMajorInRoom.push(user.major);
      });

      userMajorInRoom.map((item) => {
        if (user.major == item) totalPoint += 1;
      });

      roomWithMajor[room.id] = totalPoint;
    });
    return roomWithMajor;
  }

  async checkSuitableReligion(user: User, rooms: Room[]) {
    const roomWithReligion: any = {};
    rooms.map(async (room) => {
      let totalPoint = 0;

      //get major of all users in room
      const userReligionInRoom = [];
      room.users.map((user) => {
        userReligionInRoom.push(user.religion);
      });

      userReligionInRoom.map((item) => {
        if (user.religion == item) totalPoint += 5;
      });

      roomWithReligion[room.id] = totalPoint;
    });
    return roomWithReligion;
  }

  async checkSuitableAddress(user: User, rooms: Room[]) {
    const roomWithAddress: any = {};
    rooms.map(async (room) => {
      let totalPoint = 0;

      //get major of all users in room
      const userAddressInRoom = [];
      room.users.map((user) => {
        userAddressInRoom.push(user.address);
      });

      userAddressInRoom.map((item) => {
        if (user.address == item) totalPoint += 2;
      });

      roomWithAddress[room.id] = totalPoint;
    });
    return roomWithAddress;
  }

  async requestSwapRoom(requestId: string, receiveId: string) {
    const requestUser = await this.userRepo.findOne({
      where: {
        id: requestId,
      },
    });

    const receiveUser = await this.userRepo.findOne({
      where: {
        id: receiveId,
      },
    });

    await this.roomSwapRepo.save({
      requestUser: requestUser,
      receiveUser: receiveUser,
    });
    return {
      message: 'sucess',
    };
  }

  async updateNumberOfUserInRoom() {
    const rooms = await this.roomRepo.find({
      relations: ['users'],
    });
    console.log('vaooo: ', rooms);
    await Promise.all(
      rooms.map(async (room) => {
        await this.roomRepo.save({
          ...room,
          numberOfStudent: room.users.length,
        });
      }),
    );
  }

  async deleteRoom(id: string) {
    await this.roomRepo.delete({
      id: id,
    });
    return {
      message: 'delete',
    };
  }
}
