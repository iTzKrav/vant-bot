import { BaseCommand } from "../structures/BaseCommand";
import { IMessage } from "../../typings";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { isMusicPlaying } from "../utils/decorators/MusicHelper";
import { createEmbed } from "../utils/createEmbed";

@DefineCommand({
    aliases: ["np", "now-playing"],
    name: "nowplaying",
    description: "Enviar información sobre el reproductor de música actual",
    usage: "{prefix}nowplaying"
})
export class NowPlayingCommand extends BaseCommand {
    @isMusicPlaying()
    public execute(message: IMessage): any {
        const song = message.guild?.queue?.songs.first();
        return message.channel.send(
            createEmbed("info", `${message.guild?.queue?.playing ? "▶ **|** Escuchando ahora:" : "⏸ **|** Escuchando ahora:"} ` +
                `**[${song?.title as string}](${song?.url as string})**`)
                .setThumbnail(song?.thumbnail as string)
        );
    }
}
