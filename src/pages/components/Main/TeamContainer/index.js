import * as S from "../../../../lib/Main/Banner/TeamContainer/styles";
import Image from "next/image";
import person from "../../../../../public/img/joaoa.png";
import person2 from "../../../../../public/img/antonio.jpg";
import hero from "../../../../../public/img/hero-bg.png";

//Team Container of main page
export const TeamContainer = () => {
	return (
		<>
			<S.Container image={hero}>
				<S.InsideContainer>
					<h2>Produtores</h2>
					<p>
            Nesta sessão é possível conhecer os produtores da plataforma UP
            Discursivas.
					</p>

					<S.GridContainer>
						<S.GridItem>
							<S.ContainerGrid>
								<S.BoxProdutorImage>
									<a
										href="https://www.instagram.com/aefagundes93/"
										target="_blank"
										rel="noreferrer"
									>
										<Image width="200px" height="200px" src={person2} />
									</a>
								</S.BoxProdutorImage>
								<S.ProdutorInfo>
									<S.TitleName>Antonio E. Fagundes</S.TitleName>
									<S.TitleFunction>Produtor principal</S.TitleFunction>
								</S.ProdutorInfo>
							</S.ContainerGrid>
						</S.GridItem>
						<S.GridItem>
							<S.ContainerGrid>
								<S.BoxProdutorImage>
									<a
										href="https://www.instagram.com/joaoaugustopf_/"
										target="_blank"
										rel="noreferrer"
									>
										<Image width="200px" height="200px" src={person} />
									</a>
								</S.BoxProdutorImage>
								<S.ProdutorInfo>
									<S.TitleName>João Augusto</S.TitleName>
									<S.TitleFunction>Desenvolvedor</S.TitleFunction>
								</S.ProdutorInfo>
							</S.ContainerGrid>
						</S.GridItem>
					</S.GridContainer>
				</S.InsideContainer>
			</S.Container>
		</>
	);
};

export default TeamContainer;
