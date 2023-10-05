import { useEffect, useState } from "react";

const SimpleDatePicker = () => {
  interface IYEAR {
    year: number;
    id: number;
  }
  interface IMONTH {
    id: number;
    name: string;
  }
  const [yearsList, setYearsList] = useState<IYEAR[]>([]);
  const monthsList: IMONTH[] = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];
  const [currentDays, setCurrentDays] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]);
  const daysOfWeek: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const [selectedValue, setSelectedValue] = useState<{
    year: number;
    month: string;
    day: number;
    fullDate: string;
  }>({
    year: 2023,
    month: "October",
    day: 5,
    fullDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  // set years list
  useEffect(() => {
    const yearIdArray: any = [];
    let i = 0;
    for (let year = 2023; year >= 1500; year--) {
      yearIdArray.push({ year, id: i + 1 });
      i++;
    }
    setYearsList(yearIdArray);
  }, []);

  useEffect(() => {
    const get_day = new Date(
      `${selectedValue.year}-${selectedValue.month}-01`
    ).getDay();
    const emptyDay: number[] = [];
    for (let i = 0; i < get_day; i++) {
      if (get_day !== 0) {
        emptyDay.push(-1);
      }
    }

    if (
      selectedValue.month === "January" ||
      selectedValue.month === "March" ||
      selectedValue.month === "May" ||
      selectedValue.month === "July" ||
      selectedValue.month === "August" ||
      selectedValue.month === "October" ||
      selectedValue.month === "December"
    ) {
      setCurrentDays([
        ...emptyDay,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
      ]);
    } else if (
      selectedValue.month === "April" ||
      selectedValue.month === "June" ||
      selectedValue.month === "September" ||
      selectedValue.month === "November"
    ) {
      setCurrentDays([
        ...emptyDay,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ]);
    } else if (selectedValue.month === "February") {
      if (
        (parseInt(selectedValue.year) % 4 === 0 &&
          parseInt(selectedValue.year) % 100 !== 0) ||
        parseInt(selectedValue.year) % 400 === 0
      ) {
        setCurrentDays([
          ...emptyDay,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
        ]);
      } else {
        setCurrentDays([
          ...emptyDay,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
        ]);
      }
    }
  }, [selectedValue.month, selectedValue.year]);

  useEffect(() => {
    if (
      selectedValue.year !== 0 &&
      selectedValue.month !== "" &&
      selectedValue.day !== 0
    ) {
      const newDate = new Date(
        `${selectedValue.year}-${selectedValue.month}-${selectedValue.day}`
      );

      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const day = newDate.getDate();

      setSelectedValue({
        ...selectedValue,
        fullDate: `${year}/${month}/${day}`,
      });
    } else {
      setSelectedValue({
        ...selectedValue,
        fullDate: ``,
      });
    }
  }, [selectedValue.day, selectedValue.month, selectedValue.year]);

  return (
    <section className="flex lg:justify-center p-8">
      <div className="relative z-20">
        <h1 className="w-full text-2xl font-bold mb-4 text-blue-700">
          Simple Date Picker
        </h1>

        <div className="my-6 lg:my-32">
          <div className="relative top-0 left-0">
            <div
              className="w-full"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <p className="form-label text-dark-500 font-semibold mb-[4px]">
                Due Date
              </p>
              <div className="border-[2px] rounded-lg border-blue-400 px-2 cursor-pointer bg-white">
                <input
                  type="text"
                  className="form-control focus:outline-none p-2 cursor-pointer"
                  readOnly={true}
                  value={selectedValue.fullDate}
                />
                <i className="fa-solid fa-calendar-days text-xl"></i>
              </div>
            </div>
            {showDatePicker && (
              <div className="absolute top-20 left-0 rounded-lg border-[1px] border-slate-400 mt-3 p-5 shadow-lg min-w-[80vw] lg:min-w-[400px] max-w-[50vw] bg-white">
                <div className="flex justify-between gap-8">
                  <select
                    className="pr-2"
                    name=""
                    id=""
                    onChange={(e) =>
                      setSelectedValue({
                        ...selectedValue,
                        year: parseInt(e.target.value),
                      })
                    }
                    value={selectedValue.year}
                  >
                    <option value="">Select Year</option>
                    {yearsList?.map((year: IYEAR, index: number) => (
                      <option key={index} value={year.year}>
                        {year.year}
                      </option>
                    ))}
                  </select>
                  <select
                    className="pr-2"
                    name=""
                    id=""
                    onChange={(e) => {
                      setSelectedValue({
                        ...selectedValue,
                        month: e.target.value,
                        day: 0,
                      });
                    }}
                    value={selectedValue.month}
                  >
                    <option value="">Select Month</option>
                    {monthsList?.map((month: IMONTH, index: number) => (
                      <option key={index} value={month.name}>
                        {month.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* days */}
                <div className="py-10">
                  <div className="grid grid-cols-7 gap-2 pb-4">
                    {daysOfWeek?.map((week: string) => (
                      <div
                        className="flex justify-center cursor-pointer font-semibold"
                        key={week}
                      >
                        {week}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {currentDays?.map((day: number, index: number) => {
                      return (
                        <div
                          className={`flex justify-center cursor-pointer ${
                            day === selectedValue.day
                              ? "text-blue-500 font-bold "
                              : ""
                          }`}
                          key={index}
                          onClick={() => {
                            if (day !== -1) {
                              setSelectedValue({
                                ...selectedValue,
                                day: day,
                              });
                            }
                          }}
                        >
                          {day !== -1 ? day : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showDatePicker && (
        <div
          className="w-full h-full absolute top-0 left-0 bg-gray-100 z-10 bg-opacity-20"
          onClick={() => setShowDatePicker(false)}
        >
          {" "}
        </div>
      )}
    </section>
  );
};

export default SimpleDatePicker;
