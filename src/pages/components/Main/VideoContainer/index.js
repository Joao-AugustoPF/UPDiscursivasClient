import * as S from "../../../../lib/Main/VideoContainer/styles";

//Video container of main page
export const VideoContainer = () => {
	return (
		<>
			<S.Container>
				<S.InsideContainer>
					<h2>Como usar nossa plataforma</h2>
					<p>
            Siga as intruções do vídeo para entender o funcionamento da
            plataforma UP Discursivas
					</p>

					<S.ContainerVideo>
						<iframe
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/tgbNymZ7vqY"
						></iframe>
					</S.ContainerVideo>
				</S.InsideContainer>
			</S.Container>
		</>
	);
};

export default VideoContainer;
