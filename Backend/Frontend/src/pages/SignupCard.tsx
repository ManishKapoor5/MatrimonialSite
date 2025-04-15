import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link,
} from "@chakra-ui/react";
import { useState, ChangeEvent } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom.js";
import useShowToast from "../hooks/useShowToast.tsx";
import userAtom from "../atoms/userAtom.js";

interface SignupInputs {
	name: string;
	username: string;
	email: string;
	password: string;
}

export default function SignupCard() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const setAuthScreen = useSetRecoilState(authScreenAtom);
	const [inputs, setInputs] = useState<SignupInputs>({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSignup = async () => {
		try {
			const res = await fetch("/api/users/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();

			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error: any) {
			showToast("Error", error.message || "Something went wrong", "error");
		}
	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl isRequired>
									<FormLabel>Full name</FormLabel>
									<Input
										name='name'
										type='text'
										onChange={handleChange}
										value={inputs.name}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										name='username'
										type='text'
										onChange={handleChange}
										value={inputs.username}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								name='email'
								type='email'
								onChange={handleChange}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									name='password'
									type={showPassword ? "text" : "password"}
									onChange={handleChange}
									value={inputs.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((prev) => !prev)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
