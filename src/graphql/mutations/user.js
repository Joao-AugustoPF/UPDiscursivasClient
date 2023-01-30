import { gql } from "@apollo/client";

//Set the user photo to the backend. Why use this? Because was the better way found to set it to backend using Strapi.
export const MutationSetPhoto = gql`
	mutation MutationRegisterPhoto(
		$id: ID!
		$data: UsersPermissionsUserInput!
	) {
		updateUsersPermissionsUser(id: $id, data: $data) {
			data {
				id
				attributes {
					photo {
						data {
							attributes {
								url
							}
						}
					}
				}
			}
		}
	}
`;

export const MutationRegisterInfoUser = gql`
	mutation MutationRegisterInfoUser(
		$id: ID!
		$data: UsersPermissionsUserInput!
	) {
		updateUsersPermissionsUser(id: $id, data: $data) {
			data {
				id
			}
		}
	}
`;
