export default function ConfirmCode({ query }) {
	return (
		<>
			{query ? (
				<>
					<div>
						<h4 className="text-success">E-mail confirmado!</h4>
					</div>
				</>
			) : (
				<>
					<div>
						<h5 className="text-warning">
							Aguardando confirmação de e-mail...
						</h5>
					</div>
				</>
			)}
		</>
	);
}
