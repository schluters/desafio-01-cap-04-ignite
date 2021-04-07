import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { 
  Box,
  Flex, 
  Grid, 
  Icon, 
  IconButton, 
  Heading, 
  Stack, 
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'

import { RiInformationLine } from 'react-icons/ri'

import { api } from '../../services/api'
import { Header } from '../../components/Header'
import { Cities } from '../../components/Cities'

export interface ContinentProps {
  continent: {
    name: string;
    description: string;
    summary: string;
    image: string;
    url: string;
    countries: number;
    languages: number;
    topCities: number;
    cities: {
      name: string;
      country: string;
      countryCode: string;
      image: string;
    }[]
  }
}

export default function Continent({continent}: ContinentProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>WorldTrip - {continent.name}</title>
      </Head>
      <Header />
      <Flex
        w="100%"
        h={["150px", "500px"]}
        bgImage={`url(${continent.image})`}
        bgPosition={["100% 40%", "100% 50%"]}
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Flex align={["center", "flex-end"]} justify={["center", "flex-start"]} maxW="1160px" w="100%" mx="auto">
          <Box>
            <Heading color="whiteAlpha.800" fontWeight="500" fontSize={["2xl", "5xl"]} mb={[0, 16]}>
            {continent.name}
            </Heading>
          </Box>
        </Flex>
      </Flex>

      <Flex direction="column" maxW="1160px" mx="auto" mb={10} px={4}>
        <Grid align="center" templateColumns={["1fr", "1.2fr 1fr"]} gap={[5,20]} my={[8, 20]}>
          <Text
            fontSize={["lg", "2xl"]}
            color="text"
            textAlign="justify"
          >
          {continent.description}
          </Text>
          <Stack align="center" justify="space-between" direction="row" spacing="2">
            <Box textAlign="center">
              <Heading fontSize={["2xl","5xl"]} color="yellow.500" fontWeight="500">
                {continent.countries}
              </Heading>
              <Text fontSize={["md", "xl"]} color="text" fontWeight="500">
                países
              </Text>
            </Box>
            <Box textAlign="center">
              <Heading fontSize={["2xl","5xl"]} color="yellow.500" fontWeight="500">
                {continent.languages}
              </Heading>
              <Text fontSize={["md", "xl"]} color="text" fontWeight="500">
                línguas
              </Text>
            </Box>
            <Box textAlign="center">
              <Heading fontSize={["2xl","5xl"]} color="yellow.500" fontWeight="500">
              {continent.cities.length}
              </Heading>
              <Text fontSize={["md", "xl"]} color="text" fontWeight="500">
                cidades {continent.topCities - continent.cities.length}+
                <Popover>
                  <PopoverTrigger>
                    <IconButton aria-label={continent.name} bg="transparent" p="0" m="0"><Icon as={RiInformationLine} color="text" fontSize={14} justifySelf="start" /></IconButton>
                  </PopoverTrigger>
                  <PopoverContent fontSize={["sm", "md"]} color="text" borderColor="yellow.300">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>São mais de {continent.topCities} cidades</PopoverBody>
                  </PopoverContent>
                </Popover>
              </Text>
            </Box>
          </Stack>
        </Grid>
        <Cities cities={continent.cities} topCities={continent.topCities} />
      </Flex>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const continents = await api.get('/continents').then(response => response.data )
  const paths = continents.map(continent => ({
    params: { url: continent.url },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ContinentProps> = async (context) => {
  const { url } = context.params
  const continents = await api.get(`/continents`).then(response => response.data)
  const continent = continents.find(continent => continent.url === url)

  return {
    props: {
      continent
    },
    revalidate: 1800,
  }
}
