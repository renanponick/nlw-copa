import { useNavigation, useRoute } from "@react-navigation/native";
import { HStack, useToast, VStack } from "native-base"
import { useEffect, useState } from "react";
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PoolCardPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string
}

export function Details() {
    const route = useRoute();
    const { id } = route.params as RouteParams
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSelected, setIsSelected ] = useState<'guesses' | 'ranking'>('guesses');
    const [ poolDetails, setPoolDetails ] = useState<PoolCardPros>({} as PoolCardPros);
    const toast = useToast();

    async function fetchPoolsDetails() {
        try {
            setIsLoading(true)
            const response = await api.get(`/pools/${id}`)
            setPoolDetails(response.data.pool)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            return toast.show({
                title: "Não foi possível carregar detalhes do bolão.",
                placement: "top",
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCodeShare() {
        await Share.share({
           message: poolDetails.code 
        })
    }

    useEffect(() => {
        fetchPoolsDetails();
    }, [id])
    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={poolDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />
            { 
                poolDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PoolHeader data={poolDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option
                                title="Seus palpites" 
                                isSelected={isSelected === 'guesses'}
                                onPress={() => setIsSelected('guesses')}
                            />
                            <Option
                                title="Ranking do Grupo"  
                                isSelected={isSelected === 'ranking'}
                                onPress={() => setIsSelected('ranking')}
                            />
                        </HStack>
                        <Guesses
                            poolId={poolDetails.id}
                            code={poolDetails.code}
                            onShare={handleCodeShare}
                        />
                    </VStack>
                    : <EmptyMyPoolList
                        onShare={handleCodeShare}
                        code={poolDetails.code}
                    />
            }
        </VStack >
    )
}