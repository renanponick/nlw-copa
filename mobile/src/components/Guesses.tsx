import { FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
  code: string;
  onShare: () => {};
}

export function Guesses({ poolId, code, onShare }: Props) {
  const [ isLoading, setIsLoading ] = useState(true);
  const [games, setGames] = useState<GameProps[]>([])
  const [ firstTeamPoints, setFirstTeamPoints ] = useState('0');
  const [ secondTeamPoints, setSecondTeamPoints ] = useState('0');

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true)
      const gamesResponse = await api.get(`/pools/${poolId}/games`);
      setGames(gamesResponse.data.games)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      return toast.show({
          title: "Não foi possível carregar os jogos.",
          placement: "top",
          bgColor: 'red.500'
      });
    } finally {
        setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    setIsLoading(true)
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
            title: "Informe o placar do palpite",
            placement: "top",
            bgColor: 'red.500'
        });
      }

      await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      })

      toast.show({
        title: "Palpite cadastrado!",
        placement: "top",
        bgColor: 'green.500'
      });

      fetchGames();
    } catch (error) {
        console.log(error);
        setIsLoading(false)
        return toast.show({
            title: "Não foi possível enviar o palpite.",
            placement: "top",
            bgColor: 'red.500'
        });
    }
  }

  useEffect(() => {
      fetchGames();
  }, [poolId])

  if (isLoading) {
      return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game 
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} onShare={onShare}/>}
    />
  );
}
