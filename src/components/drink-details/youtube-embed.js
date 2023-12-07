const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width={"100%"}
      height={"360"}
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;
