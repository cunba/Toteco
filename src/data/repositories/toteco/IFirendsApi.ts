import { IGlobalRepository } from "../../../infrastructure/data/repositories/IGlobalRespository"
import { Friend, FriendDTO } from "../../model/toteco/Friend"


export interface IFriendsApi extends IGlobalRepository<Friend, FriendDTO, Friend> {

    getByFollower(follower: string): Promise<Friend[] | undefined>

}