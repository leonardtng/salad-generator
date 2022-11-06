import Head from "next/head";
import { useEffect, useState } from "react";
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
import { FaTimes } from "react-icons/fa";

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
      setIsOpen(true);
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

  return (
    <div className="h-fit md:h-screen w-screen flex items-center justify-center font-primary">
      <Head>
        <title>Salad Maker</title>
        <meta name="description" content="Create your healthy salad!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
            {isLoading ? "making" : salad.length > 0 ? "make another" : "make"}
          </motion.button>
        </div>

        <div className="mt-8">
          {salad.length === 0 && !isLoading ? (
            <div className="flex justify-center items-end h-[450px] w-[300px]">
              <div className="h-[300px] w-[180px]">
                <Image
                  src="/placeholder.png"
                  alt="placeholder"
                  height={180}
                  width={180}
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
                    <div key={label} className="flex flex-col items-center">
                      <Image src={image} alt={label} height={180} width={180} />
                      <div>{label}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <AnimatePresence initial={false} exitBeforeEnter={true}>
          {isOpen && !isLoading && (
            <div className="h-full relative  lg:fixed w-[350px] lg:max-h-screen overflow-y-auto top-0 right-0 ">
              <motion.div
                tabIndex={-1}
                className="flex flex-col dark:bg-darkCard bg-lightBackground y00ts:border y00ts:border-darkBorder"
                initial={{ x: window.innerWidth * 2 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ x: window.innerWidth * 2, transition: { duration: 1 } }}
                key="menu"
              >
                <div className="absolute right-0 p-8 mt-1">
                  <motion.button
                    className="dark:text-darkFontPrimary text-lightFontPrimary outline-none"
                    onClick={handleClose}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes />
                  </motion.button>
                </div>
                <motion.div
                  className="flex flex-col flex-1 pt-8 px-8"
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
                      <ul>
                        {NUTRIENTS_MAP.macro
                          .filter((nutrient: string) =>
                            salad
                              .flatMap(
                                (ingredient: Ingredient) => ingredient.nutrients
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
                      <ul>
                        {NUTRIENTS_MAP.micro
                          .filter((nutrient: string) =>
                            salad
                              .flatMap(
                                (ingredient: Ingredient) => ingredient.nutrients
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
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
