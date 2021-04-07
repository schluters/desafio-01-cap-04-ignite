import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

export function Banner() {
  return (
    <Flex
      w="100%"
      h={["163px", "335px"]}
      bgImage="url('/images/background.png')"
      bgPosition={["100% 20%", "100% 30%"]}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex align="center" justify="space-between" maxW="1160" w="100%" mx="auto">
        <Box>
          <Heading color="white" fontWeight="500" fontSize={["xl", "4xl"]}>
            5 continentes,<br />infinitas possibilidades.
          </Heading>
          <Text color="white" mt="5" fontSize={["sm","xl"]} maxW={["100%", "550px"]}>
            Chegou a hora de tirar do papel a viagem que você sempre sonhou.
          </Text>
        </Box>
        <Box>
          <Image
            maxW="417px"
            display={['none', 'block']}
            src="/images/airplane.svg"
            alt="Avião voando entre algumas nuvens."
            transform="translateY(48px)"
          />
        </Box>
      </Flex>
    </Flex>
  )
}
