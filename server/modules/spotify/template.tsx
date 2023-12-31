import renderToString from "preact-render-to-string";

export type SpotifyDTO = {
  artist: string;
  song: string;
};

type SpotifyTemplateProps = {
  data: SpotifyDTO;
};

function SpotifyTemplate(props: SpotifyTemplateProps) {
  const { data } = props;

  return (
    <div>
      <div className="flex flex col place-items-center gap-2">
        <i className="ri-headphone-line"></i>
        <span>{data.song}</span>
      </div>
      <div className="flex flex col place-items-center gap-2">
        <i className="ri-album-line"></i>
        <span>{data.artist}</span>
      </div>
    </div>
  );
}

export function generateSpotifyHTML(data: SpotifyDTO) {
  return renderToString(<SpotifyTemplate data={data} />);
}
