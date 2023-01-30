import Banner from "./Banner";
import * as S from "../../../lib/Main/styles";
import TeamContainer from "./TeamContainer";
import VideoContainer from "./VideoContainer";

//Put all the container together in a single page
const Main = () => (
	<S.Wrapper>
		<Banner />
		<VideoContainer />
		<TeamContainer />
	</S.Wrapper>
);

export default Main;
