import { Button as ButtonNative, Text, IButtonProps } from 'native-base';

interface Props extends IButtonProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export function Button(props: Props) {
    const { 
        title,
        type = 'PRIMARY',
        ...rest 
    } = props

    return (
        <ButtonNative
            w="full"
            h={14}
            rounded='sm'
            fontSize="md"
            textTransform="uppercase"
            bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
            _pressed={{ bg: type === 'SECONDARY' ? 'red.600' : 'yellow.600'}}
            _loading={{
                _spinner: { color: 'black' }
            }}
            { ...rest }
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                color={ type === 'SECONDARY' ? 'white' : 'black' }
            >
                { title }
            </Text>
        </ButtonNative>
    )
}