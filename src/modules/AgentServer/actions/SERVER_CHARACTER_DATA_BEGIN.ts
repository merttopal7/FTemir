import { Packet, StaticTypes } from "@/core";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class SERVER_CHARACTER_DATA_BEGIN extends Packet {
  static opcode = 0x34A5;
  constructor() { super(SERVER_CHARACTER_DATA_BEGIN.opcode); }

  Read() {
    
  }

  Build() {
    this.Reset();

    return this;
  }
}