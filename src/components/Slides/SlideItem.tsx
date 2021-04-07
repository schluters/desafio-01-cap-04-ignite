import Link from 'next/link'
import { Flex, Heading, Text } from '@chakra-ui/react'

interface SlideItemProps {
  image: string;
  name: string;
  summary: string;
  url: string;
}

export function SlideItem({image, name, summary, url}: SlideItemProps) {
  return (
    <Flex
      w="100%"
      h={["250px","450px"]}
      align="center"
      justify="center"
      direction="column"
      bgImage={`url('${image}')`}
      bgPosition="100% 50%"
      bgRepeat="no-repeat"
      bgSize="cover"
      textAlign="center"
    >
      <Link href={`/continent/${url}`}>
        <a>
          <Heading fontSize={["3xl", "5xl"]} color="white" fontWeight="bold">{name}</Heading>
          <Text fontWeight="bold" color="white" fontSize={["0.8rem","1xl", "2xl"]} mt={["2","4"]}>{summary}</Text>
        </a>
      </Link>
    </Flex>
  )
}
