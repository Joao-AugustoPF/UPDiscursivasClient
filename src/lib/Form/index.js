import styled from "styled-components";
import dots from "../../../public/img/dots.gif";
//The form loading that we aren't using yet.
export const FormLoading = styled.img.attrs(() => ({
	src: `${dots.src}`,
	alt: "Esperando..."
}))`
	width: 20px;
`;
