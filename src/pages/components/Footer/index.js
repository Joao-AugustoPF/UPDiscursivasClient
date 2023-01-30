import { Component } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YoutubeIcon from "@mui/icons-material/YouTube";

import Link from "next/link";
//This is the footer of pages
class Footer extends Component {
	render() {
		return (
			<>
				<footer className="bg-dark text-center text-white">
					<div className="container p-4 pb-0 d-flex justify-content-around">
						<section className="mb-4">
							<p>UP Discursivas:</p>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://www.instagram.com/up_discursivas/"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i>
									<InstagramIcon />
								</i>
							</a>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://t.me/updiscursivas"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i>
									<TelegramIcon />
								</i>
							</a>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://youtube.com/channel/UC2_gvIp6TSVCOl0PfSi7ZKg"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i>
									<YoutubeIcon />
								</i>
							</a>
						</section>
						<div className="d-flex flex-column justify-content-center align-items-center">
							<Link href="/politicas">
								<a className="text-danger text-decoration-none">Políticas</a>
							</Link>
							<Link href="/termos-de-uso">
								<a className="text-danger text-decoration-none">
                  Termos de uso
								</a>
							</Link>
						</div>
						<section>
							<p>UP Concursos:</p>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://www.instagram.com/up_concursos/"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i>
									<InstagramIcon />
								</i>
							</a>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://t.me/upconcursos"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i>
									<TelegramIcon />
								</i>
							</a>
							<a
								className="btn btn-outline-light btn-floating m-1"
								href="https://www.youtube.com/channel/UCNU4F8rocvtP4JC2HFmS6uw"
								target="_blank"
								rel="noreferrer"
								role="button"
							>
								<i>
									<YoutubeIcon />
								</i>
							</a>
						</section>
					</div>
					<div className="text-center d-flex flex-column">
            © 2022 Copyright:
						<a className="text-white" href="https://updiscursivas.com.br/">
              updiscursivas.com.br
						</a>
					</div>
				</footer>
			</>
		);
	}
}

export default Footer;
