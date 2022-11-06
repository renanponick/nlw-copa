import { Heading, Text, useToast, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo.svg'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function New() {
    const [ pool, setPool ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const toast = useToast();
    const { navigate } = useNavigation();

    async function handlePoolCreate() {
        if (!pool.trim()) {
            return toast.show({
                title: "Informe o nome do seu bolão",
                placement: "top",
                bgColor: 'red.500'
            })
        }
        try {
            setIsLoading(true)
            await api.post('/pools', {
                title: pool
            })

            toast.show({
                title: "Criado com sucesso.",
                placement: "top",
                bgColor: 'green.500'
            })
            setPool('')
            navigate('pools')
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            toast.show({
                title: "Não foi possível criar o bolão. Tente novamente.",
                placement: "top",
                bgColor: 'red.500'
            })
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" />
            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa {'\n'} e compartilhe entre amigos!
                </Heading>

                <Input
                    value={pool}
                    onChangeText={setPool}
                    mb={2}
                    placeholder="Qual nome do seu bolão?"
                />

                <Button
                    title="Criar meu bolão"
                    onPress={handlePoolCreate}
                    isLoading={isLoading}
                />

                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único
                    que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}