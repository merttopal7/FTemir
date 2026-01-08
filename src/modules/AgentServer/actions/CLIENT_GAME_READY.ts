import { Packet, StaticTypes } from "@/core";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class CLIENT_GAME_READY extends Packet {
  static opcode = 0x3012;
  constructor() { super(CLIENT_GAME_READY.opcode); }

  Read() {

  }

  Build() {
    this.Reset();

    return this;
  }
}