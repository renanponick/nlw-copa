import { Heading, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ code, setCode ] = useState('')
    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPool() {
        try {
            setIsLoading(true)

            if (!code.trim()) {
                return toast.show({
                    title: "Informe o código.",
                    placement: "top",
                    bgColor: 'red.500'
                });
            }

            await api.post('/pools/join', { code })
            toast.show({
                title: "Sucesso.",
                placement: "top",
                bgColor: 'green.500'
            });
            setCode('')
            setIsLoading(false)
            navigate('pools')
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            if (error.response?.data.message === 'Pool not found.') {
                return toast.show({
                    title: "Bolão não encontrado.",
                    placement: "top",
                    bgColor: 'red.500'
                });
            }
            if (error.response?.data.message === 'You already joined this pool.') {
                return toast.show({
                    title: "Você já está participando desse bolão",
                    bgColor: 'red.500'
                });
            }

            toast.show({
                title: "Não foi possível encontrar o bolão.",
                placement: "top",
                bgColor: 'red.500'
            })
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header showBackButton={true} title="Buscar por código" />
            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de{'\n'} seu código único
                </Heading>

                <Input
                    value={code}
                    onChangeText={setCode}
                    mb={2}
                    autoCapitalize="characters"
                    placeholder="Qual o código do bolão?"
                />

                <Button
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                    title="BUSCAR BOLÃO"
                />
            </VStack>
        </VStack>
    )
}