import * as S from "../../../../lib/Main/Banner/styles";
import hero from "../../../../../public/img/hero-bg.png";

//Banner Page
export const Banner = () => {
	return (
		<>
			<S.BannerContainer image={hero}>
				<S.ContainerAll>
					<S.BannerContainerLeft>
						<S.LeftBasement>
							<S.LeftInsideTextUpper>
								<S.TextTitle>
                  A melhor plataforma para ajudar em suas provas
								</S.TextTitle>
								<S.TextDescription>
                  Venha conferir o melhor plano para ajudar você!
								</S.TextDescription>
								<S.LeftInsideButton type="button" href="/assinaturas">
                  Ver planos
								</S.LeftInsideButton>
							</S.LeftInsideTextUpper>
						</S.LeftBasement>
					</S.BannerContainerLeft>
				</S.ContainerAll>
			</S.BannerContainer>
		</>
	);
};

export default Banner;
