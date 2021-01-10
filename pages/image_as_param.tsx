import { GetServerSideProps } from "next";
import Head from "next/head";
import getImage from "../helpers/getImage";

interface Props {
  imgbase64: string;
}

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <title>covid-maps</title>
        <img src={`data:image/png;base64,${props.imgbase64}`} />
      </Head>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const imgbuff = await getImage(11);
  return {
    props: {
      imgbase64: imgbuff.toString("base64"),
    },
  };
};
