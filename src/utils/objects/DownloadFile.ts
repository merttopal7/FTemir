import { Packet, StaticTypes } from "@/core";
const { bool, byte, int, short, string, stringASCII } = StaticTypes;

export class DownloadFile {
    Id = int();
    Length = int();
    Name = string();
    Path = string();
    ToBePacket = byte();
    constructor(packet: Packet) {
        packet.TryRead(this.Id);
        packet.TryRead(this.Length);
        packet.TryRead(this.Name);
        packet.TryRead(this.Path);
        packet.TryRead(this.ToBePacket);
    }
    Build(packet: Packet) {
        packet.TryWrite(this.Id);
        packet.TryWrite(this.Length);
        packet.TryWrite(this.Name);
        packet.TryWrite(this.Path);
        packet.TryWrite(this.ToBePacket);
        return packet;
    }
}