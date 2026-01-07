import { Packet, StaticTypes } from "@/core";
import { StaticType } from "@/core/types";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class SERVER_GATEWAY_LOGIN_IBUV_CHALLENGE extends Packet {
    static opcode = 0x2322;
    constructor() { super(SERVER_GATEWAY_LOGIN_IBUV_CHALLENGE.opcode); }

    ImageCompressed = short();

    ImageFlag = byte();
    ImageHeight = short();
    ImageRemain = short();
    ImageUncompressed = short();
    ImageWidth = short();

    Read() {
        this.TryRead(this.ImageFlag);
        this.TryRead(this.ImageRemain);
        this.TryRead(this.ImageCompressed);
        this.TryRead(this.ImageUncompressed);
        this.TryRead(this.ImageWidth);
        this.TryRead(this.ImageHeight)

        const remainingRead = this.RemainingRead();
        for (let i = 0; i < remainingRead; i++)
            this.TryRead(byte())
    }

    Build() {
        this.Reset();

        return this;
    }
}