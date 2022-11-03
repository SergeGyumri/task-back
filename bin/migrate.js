import {Age, Interest, Rooms, Users, RoomMessages} from "../models";

async function main() {
  for (const Model of [
    Age, Interest, Rooms, Users, RoomMessages
  ]) {
    await Model.sync({alter: true})
  }
  process.exit(0);
}

main().catch(console.error)
