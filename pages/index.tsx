import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import {
  Ingredient,
  INGREDIENTS,
  INGREDIENTS_BY_NUTRIENTS,
  INGREDIENTS_BY_TYPE,
  NUTRIENTS_MAP,
} from "../constants/data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Spin from "../components/Spin";
import { startCase } from "lodash";
import { FaChartBar, FaChevronDown, FaGithub } from "react-icons/fa";
import ReactFullpage from "@fullpage/react-fullpage";
import Modal from "../components/Modal";
import Link from "next/link";

const formatNutrient = (nutrient: string) => {
  return startCase(nutrient).replace("B 3", "B3").replace("B 1", "B1");
};

const getRandom = (arr: string[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateSalad = () => {
  const salad: string[] = [];
  const nutrients: string[] = [];

  const bases = INGREDIENTS_BY_TYPE.base;
  const generatedBase = getRandom(bases);
  salad.push(generatedBase);
  nutrients.push(...INGREDIENTS[generatedBase].nutrients);

  while (
    nutrients.filter((nutrient: string) =>
      NUTRIENTS_MAP.macro.includes(nutrient)
    ).length < 3
  ) {
    NUTRIENTS_MAP.macro.forEach((nutrient: string) => {
      if (!nutrients.includes(nutrient)) {
        const ingredients = INGREDIENTS_BY_NUTRIENTS[nutrient];
        var temp: string;
        do {
          const generatedIngredient =
            ingredients[Math.floor(Math.random() * ingredients.length)];
          temp = generatedIngredient;
        } while (salad.includes(temp));
        salad.push(temp);
        nutrients.push(nutrient);
      }
    });
  }

  const basesFiltered = INGREDIENTS_BY_TYPE.base.filter(
    (ingredient: string) => !salad.includes(ingredient)
  );
  const secondGeneratedBase = getRandom(basesFiltered);
  salad.push(secondGeneratedBase);
  nutrients.push(...INGREDIENTS[secondGeneratedBase].nutrients);

  const missingMicro = NUTRIENTS_MAP.micro.filter(
    (nutrient: string) => !nutrients.includes(nutrient)
  );
  const toppingsFiltered = INGREDIENTS_BY_TYPE.base.filter(
    (ingredient: string) =>
      !salad.includes(ingredient) && missingMicro.includes(ingredient)
  );
  if (toppingsFiltered.length > 0) {
    const finalTopping = getRandom(toppingsFiltered);
    salad.push(finalTopping);
  } else {
    const toppingsFiltered = INGREDIENTS_BY_TYPE.base.filter(
      (ingredient: string) => !salad.includes(ingredient)
    );
    const finalTopping = getRandom(toppingsFiltered);
    salad.push(finalTopping);
  }

  return salad.map((ingredient: string) => INGREDIENTS[ingredient]);
};

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [salad, setSalad] = useState<Ingredient[]>([]);

  const handleGenerateSalad = () => {
    setIsLoading(true);
    setTimeout(() => {
      const salad = generateSalad();
      setSalad(salad);
      setIsLoading(false);
    }, 4500);
  };

  const container = {
    hidden: { x: 200, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { x: 200, opacity: 0 },
    show: { x: 0, opacity: 1 },
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const [size, setSize] = useState<number[]>([0, 0]);

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen || event.key !== "Escape") return;

      handleClose();
    },
    [handleClose, isOpen]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  if (!isBrowser) return <></>;

  return (
    <div className="min-h-screen w-screen font-primary">
      <Head>
        <title>Salad Maker</title>
        <meta name="description" content="Create a healthy salad!" />
        <link rel="icon" href="/favicon.ico" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://salad-maker.vercel.app/" />
        <meta property="og:title" content="Salad Maker" />
        <meta property="og:site_name" content="Salad Maker" />
        <meta property="og:description" content="Create a healthy salad!" />
        <meta property="og:image" content="/card.png" />

        {/* <!-- Twitter --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://salad-maker.vercel.app/"
        />
        <meta property="twitter:title" content="Salad Maker" />
        <meta
          property="twitter:description"
          content="Create a healthy salad!"
        />
        <meta property="twitter:image" content="/card.png" />
      </Head>

      <ReactFullpage
        normalScrollElements="#modal-portal"
        scrollingSpeed={1000}
        autoScrolling={size[0] > 640}
        render={({ state, fullpageApi }) => {
          return (
            <ReactFullpage.Wrapper>
              <main className="section h-fit md:h-screen w-screen flex flex-col justify-center items-center">
                <div className="w-screen flex flex-col items-center">
                  <div className="flex flex-col items-center gap-3 font-title">
                    <div className="text-3xl">salad maker</div>
                    <div>create the perfect salad!</div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-center items-center gap-2 mt-3 bg-[#8be78b] py-[2px] w-[160px] disabled:text-gray-500 disabled:cursor-not-allowed"
                      onClick={() => handleGenerateSalad()}
                      disabled={isLoading}
                    >
                      {isLoading && <Spin />}
                      {isLoading
                        ? "making"
                        : salad.length > 0
                        ? "make another"
                        : "make"}
                    </motion.button>
                  </div>

                  <div className="mt-6">
                    {salad.length === 0 && !isLoading ? (
                      <div className="flex justify-center items-end h-[450px] w-[300px]">
                        <div className="h-[300px] w-[180px]">
                          <Image
                            src="/placeholder.png"
                            alt="placeholder"
                            height={180}
                            width={180}
                            priority
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        {isLoading ? (
                          <Image
                            src="/loading.gif"
                            alt="Loading"
                            height={450}
                            width={600}
                          />
                        ) : (
                          <div className="grid grid-cols-3 justify-between gap-3 h-[450px]">
                            {salad.map(({ label, image }: Ingredient) => (
                              <div
                                key={label}
                                className="flex flex-col items-center"
                              >
                                <Image
                                  src={image}
                                  alt={label}
                                  height={180}
                                  width={180}
                                />
                                <div>{label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                    <div className="h-[32px] mt-5 flex justify-center">
                      {salad.length > 0 && !isLoading && (
                        <AnimatePresence initial={false} exitBeforeEnter={true}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.2,
                              ease: [0, 0.71, 0.2, 1.01],
                            }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className="py-1 w-[130px] flex justify-center items-center gap-2 rounded-full bg-[#eca341]"
                              onClick={() => setIsOpen(true)}
                            >
                              <FaChartBar />
                              Nutrition
                            </motion.button>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>

                    <div className="w-full absolute bottom-8 left-0 flex justify-center">
                      <button onClick={() => fullpageApi.moveSectionDown()}>
                        <FaChevronDown />
                      </button>
                    </div>
                  </div>
                </div>

                <Modal
                  isOpen={isOpen}
                  handleClose={handleClose}
                  className="bg-white h-[500px] overflow-y-auto rounded-xl"
                  blurHigh
                >
                  <motion.div
                    className="flex flex-col w-[350px] md:w-[400px] pt-8 px-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <motion.div
                      className="h-full flex flex-col w-full text-xl mb-3"
                      variants={item}
                    >
                      Nutrition
                    </motion.div>
                    <ul>
                      {salad.map(
                        ({ label, nutrients }: Ingredient, index: number) => (
                          <motion.li className="mb-3" variants={item}>
                            <span className="underline">
                              {index === 0
                                ? "Salad Base"
                                : `Ingredient #${index}`}
                              :
                            </span>{" "}
                            {label}
                            <ul className="pl-6">
                              {nutrients.map(
                                (nutrient: string, index: number) => (
                                  <li key={index}>
                                    - {formatNutrient(nutrient)}
                                  </li>
                                )
                              )}
                            </ul>
                          </motion.li>
                        )
                      )}
                    </ul>

                    <motion.div className="flex mt-3 mb-8" variants={item}>
                      <div className="w-1/2 mr-5">
                        <div className="font-primaryBold">Macro</div>
                        <ul className="text-sm">
                          {NUTRIENTS_MAP.macro
                            .filter((nutrient: string) =>
                              salad
                                .flatMap(
                                  (ingredient: Ingredient) =>
                                    ingredient.nutrients
                                )
                                .includes(nutrient)
                            )
                            .map((nutrient: string) => (
                              <li>✅ {formatNutrient(nutrient)}</li>
                            ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-primaryBold">Micro</div>
                        <ul className="text-sm">
                          {NUTRIENTS_MAP.micro
                            .filter((nutrient: string) =>
                              salad
                                .flatMap(
                                  (ingredient: Ingredient) =>
                                    ingredient.nutrients
                                )
                                .includes(nutrient)
                            )
                            .map((nutrient: string) => (
                              <li>✅ {formatNutrient(nutrient)}</li>
                            ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                </Modal>
                <div id="modal-portal" />
              </main>

              <section className="section  h-fit md:h-screen w-screen flex flex-col justify-center items-center">
                <div className="relative h-fit md:h-screen w-screen flex flex-col justify-center items-center px-3 md:px-0 max-w-screen md:max-w-[500px] pb-8 text-justify">
                  <div className="text-xl mb-6 font-title text-center">
                    dietary diversity
                  </div>

                  <p className="mb-3">
                    Why a randomized salad maker? Well, in an early discussion
                    paper by the International Food Policy Research Institute
                    (IFPRI) from 2002, it was suggested that there are positive
                    associations between dietary diversity and nutrient adequacy
                    from studying developed nations (Ruel 2003). In other words,
                    eating a wide range of foods is extremely important as one
                    is able to cover a larger range of nutrients that is
                    required to meet your daily needs.
                  </p>

                  <p>
                    It is also believed that having a diverse diet helps in
                    maintaining a healthy gastrointestinal microbiome.
                    Gastrointestinal tracts that contains a richer microbial
                    ecosystem was found to have a greater resilience to disease,
                    and this can be achieved by eating a wide variety of fruit
                    and vegetables (Heiman et al. 2016).
                  </p>

                  <div className="hidden md:flex justify-center w-full absolute bottom-8 left-0 ">
                    <button onClick={() => fullpageApi.moveSectionDown()}>
                      <FaChevronDown />
                    </button>
                  </div>
                </div>
              </section>

              <section className="section  h-fit md:h-screen w-screen flex flex-col justify-center items-center">
                <div className="relative h-fit md:h-screen w-screen flex flex-col justify-center items-center px-3 md:px-0 max-w-screen md:max-w-[500px] pb-8 text-justify">
                  <div className="text-xl mb-6 font-title text-center">
                    dietary diversity <br />
                    in human communities
                  </div>

                  <p className="mb-3">
                    Furthermore, in a later paper about child nutritional
                    status, it was determined by analyzing children from
                    different socio-economic statuses, that children with higher
                    dietary diversity scored higher height-for-age z-scores
                    (HAZ). They showed that despite the common notion of
                    children developing better under higher socio-economic
                    circumstances, there is also a relationship between dietary
                    diversity and diet quality independent of socio-economic
                    status (Arimond & Marie 2004).
                  </p>

                  <p>
                    This similar pattern was also proven in a seperate study on
                    inhabitants of rural Mali (Torheim et al. 2004). By
                    analyzing groups of people with different diets, it was
                    found that there is a positive correlation between those who
                    consumed from the highest number of different food groups
                    (cereals, legumes, oil/sugar, fruit, vegetables, meat, milk,
                    fish, eggs and green leaves) and those who scored the
                    highest in nutrient adequacy.
                  </p>

                  <div className="hidden md:flex justify-center w-full absolute bottom-8 left-0 ">
                    <button onClick={() => fullpageApi.moveSectionDown()}>
                      <FaChevronDown />
                    </button>
                  </div>
                </div>
              </section>

              <section className="section  h-fit md:h-screen w-screen flex flex-col justify-center items-center">
                <div className="relative h-fit md:h-screen w-screen flex flex-col justify-center items-center px-3 md:px-0 max-w-screen md:max-w-[500px] pb-8 text-justify">
                  <div className="text-xl mb-6 font-title text-center">
                    the salad maker
                  </div>

                  <p className="pb-3">
                    Combining this concept with content from YID224: Plants &
                    People about plant nutrition, I created this salad maker
                    that generates salads containing both the macro and micro
                    nutrients that we learnt are so very important to one's
                    diet. It picks from over 30 different ingredients that cover
                    all the main nutrients that humans need for a healthy diet,
                    and every salad generated takes into account the variety of
                    nutrients contained, with each salad being different from
                    the previous. Don't really like this combination? Click the
                    button again and get a new one!
                  </p>

                  <p>
                    This helps with indecision in determining what to eat, and
                    can bring in more dietary diversity to one's meal. Because
                    eating the same salad everyday gets so boring, I hope this
                    salad maker will help spice up one's meal and pave the way
                    for a healthier lifestyle through discovering new, healthy,
                    and tasty salad recipes.
                  </p>

                  <div className="hidden md:flex justify-center w-full absolute bottom-8 left-0 ">
                    <button onClick={() => fullpageApi.moveSectionDown()}>
                      <FaChevronDown />
                    </button>
                  </div>
                </div>
              </section>

              <footer className="section  h-fit md:h-screen w-screen flex flex-col justify-center items-center">
                <div className="relative h-fit md:h-screen w-screen flex flex-col justify-center items-center px-3 md:px-0 max-w-screen max-w-[500px] pb-8 text-justify">
                  <div className="text-xl mb-6 font-title">citations</div>

                  <ul className="flex flex-col gap-5">
                    <li>
                      Arimond, Mary, and Marie T. Ruel. "Dietary diversity is
                      associated with child nutritional status: evidence from 11
                      demographic and health surveys." The Journal of nutrition
                      134.10 (2004): 2579-2585.
                      <a
                        href="https://doi.org/10.1093/jn/134.10.2579"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline"
                      >
                        https://doi.org/10.1093/jn/134.10.2579
                      </a>
                    </li>
                    <li>
                      Heiman, Mark L., and Frank L. Greenway. "A healthy
                      gastrointestinal microbiome is dependent on dietary
                      diversity." Molecular metabolism 5.5 (2016): 317-320.
                      <a
                        href="https://doi.org/10.1016/j.molmet.2016.02.005"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline"
                      >
                        https://doi.org/10.1016/j.molmet.2016.02.005
                      </a>
                    </li>
                    <li>
                      Ruel, Marie T. "Is dietary diversity an indicator of food
                      security or dietary quality? A review of measurement
                      issues and research needs." Food and nutrition bulletin
                      24.2 (2003): 231-232.
                    </li>
                    <li>
                      Torheim, L., Ouattara, F., Diarra, M. et al. Nutrient
                      adequacy and dietary diversity in rural Mali: association
                      and determinants. Eur J Clin Nutr 58, 594–604 (2004).
                      <a
                        href=" https://doi.org/10.1038/sj.ejcn.1601853"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="underline"
                      >
                        https://doi.org/10.1038/sj.ejcn.1601853
                      </a>
                    </li>
                  </ul>

                  <div className="hidden md:flex justify-center w-full absolute bottom-8 left-0">
                    <Link
                      href="https://github.com/leonardtng/salad-maker"
                      passHref
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AnimatePresence initial={false} exitBeforeEnter={true}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.2,
                            ease: [0, 0.71, 0.2, 1.01],
                          }}
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                            className="p-3 rounded-full bg-gray-100"
                          >
                            <FaGithub />
                          </motion.button>
                        </motion.div>
                      </AnimatePresence>
                    </Link>
                  </div>
                </div>
              </footer>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
}
