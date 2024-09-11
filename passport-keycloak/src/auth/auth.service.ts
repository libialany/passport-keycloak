import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm';
import { UserDetails } from '../utils/types';
import { AuthenticationProvider } from './auth';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(details: UserDetails) {
    const { keycloakId } = details;
    const user = await this.userRepo.findOne({
      where: {
        keycloakId: keycloakId,
      },
    });
    if (user) {
      await this.userRepo.update({ keycloakId }, details);
      console.log('Updated');
      return user;
    } else {
      console.log('Created');
    }
    return this.createUser(details);
  }

  createUser(details: UserDetails) {
    const user = this.userRepo.create(details);
    return this.userRepo.save(user);
  }

  findUser(keycloakId: string): Promise<User | undefined> {
    return this.userRepo.findOne({
      where: {
        keycloakId: keycloakId,
      },
    });
  }
}
