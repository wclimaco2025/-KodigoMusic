import { Player } from "../Player/Player";
import { TracksItem } from "@/types/types.kodigomusic";

interface FooterProps {
  selectedSong?: TracksItem;
}

export const Footer = ({ selectedSong }: FooterProps) => {
  return <Player cancionProp={selectedSong} />;
};
