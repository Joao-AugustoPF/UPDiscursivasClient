import Link from "next/link";

//The Auth template
const Auth = ({ title, children }) => {
	return (
		<div className="">
			<section className="vh-100" style={{ backgroundColor: "#fff" }}>
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-50">
						<div className="col col-xl-10">
							<div className="card" style={{ borderRadius: "1rem" }}>
								<div className="row g-0">
									<div className="col-md-6 col-lg-5 d-none d-md-block">
										<img
											src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
											alt="login form"
											className="img-fluid"
											style={{ borderRadius: "1rem 0 0 1rem" }}
										/>
									</div>
									<div className="col-md-6 d-flex align-items-center justify-content-center">
										<div className="p-4 p-lg-5 text-black">
											<div className="d-flex align-items-center mb-3 pb-1">
												<span className="h1 fw-bold m-auto">{title}</span>
											</div>

											<div>{children}</div>
											<div className="d-flex mt-5">
												<Link href="/termos-de-uso">
													<a className="small text-muted mx-4">Termos de uso</a>
												</Link>
												<Link href="/politicas">
													<a className="small text-muted">
                            Política de Privacidade
													</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Auth;
