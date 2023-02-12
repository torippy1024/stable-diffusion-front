const fetchDeepl = async (text: string) => {
  const textTranslated = await fetch(`/api/deepl?text=${text}`)
    .then((res) => res.json())
    .then((data) => data.translations[0].text as string)
    .catch((e) => {
      console.log(e);
      return undefined;
    });

  return textTranslated;
};

export default fetchDeepl;
