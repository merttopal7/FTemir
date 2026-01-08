import { Packet, StaticTypes } from "@/core";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class SERVER_CHARACTER_DATA_END extends Packet {
  static opcode = 0x34A6;
  constructor() { super(SERVER_CHARACTER_DATA_END.opcode); }

  Read() {

  }

  Build() {
    this.Reset();

    return this;
  }
}