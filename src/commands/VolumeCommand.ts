import { BaseCommand } from "../structures/BaseCommand";
import { IMessage } from "../../typings";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { isUserInTheVoiceChannel, isMusicPlaying, isSameVoiceChannel } from "../utils/decorators/MusicHelper";
import { createEmbed } from "../utils/createEmbed";

@DefineCommand({
    aliases: ["vol"],
    name: "volume",
    description: "Mostrar o cambiar el volumen del reproductor de música",
    usage: "{prefix}volume [new volume]"
})
export class VolumeCommand extends BaseCommand {
    @isUserInTheVoiceChannel()
    @isMusicPlaying()
    @isSameVoiceChannel()
    public execute(message: IMessage, args: string[]): any {
        let volume = Number(args[0]);

        if (isNaN(volume)) return message.channel.send(createEmbed("info", `🔊 **|** El volumen actual es **\`${message.guild!.queue!.volume.toString()}\`**`));

        if (volume < 0) volume = 0;
        if (volume === 0) return message.channel.send(createEmbed("error", "Pausa el reproductor de música en lugar de ajustar el volumen a **\`0\`**"));
        if (Number(args[0]) > this.client.config.maxVolume) {
            return message.channel.send(
                createEmbed("error", `I can't set the volume above **\`${this.client.config.maxVolume}\`**`)
            );
        }

        message.guild!.queue!.volume = Number(args[0]);
        message.guild!.queue!.connection?.dispatcher.setVolume(Number(args[0]) / this.client.config.maxVolume);
        message.channel.send(createEmbed("info", `🔊 **|** Volume set to **\`${args[0]}\`**`)).catch(console.error);
    }
}
