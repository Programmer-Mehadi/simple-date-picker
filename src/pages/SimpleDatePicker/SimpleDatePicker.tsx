import { useEffect, useState } from "react";

const SimpleDatePicker = () => {
  const [yearsList, setYearsList] = useState<number[]>([]);
  const monthsList: string[] = [
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
  const [currentDays, setCurrentDays] = useState<number[]>([]);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [selectedValue, setSelectedValue] = useState({
    year: "",
    month: "",
    day: "",
    fullDate: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(true);
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
    console.log(
      new Date(`${selectedValue.year}-${selectedValue.month}-01`).getDay()
    );
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
      selectedValue.year !== "" &&
      selectedValue.month !== "" &&
      selectedValue.day !== ""
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
      setShowDatePicker(false);
    }
  }, [selectedValue.day, selectedValue.month, selectedValue.year]);

  console.log(currentDays);
  return (
    <section className="flex justify-center p-8">
      <div>
        <h1>Simple Date Picker</h1>

        <div className="my-32">
          <div className="relative top-0 left-0">
            <div
              className="w-full"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <p className="form-label text-dark-500 font-semibold mb-[4px]">
                Due Date
              </p>
              <div className="border-[2px] rounded-lg border-blue-400 px-2 cursor-pointer">
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
              <div className="absolute top-20 left-0 rounded-lg border-[1px] border-slate-400 mt-3 p-5 shadow-lg min-w-[400px]">
                <div className="flex justify-between gap-8">
                  <select
                    name=""
                    id=""
                    onChange={(e) =>
                      setSelectedValue({
                        ...selectedValue,
                        year: e.target.value,
                      })
                    }
                    value={selectedValue.year}
                  >
                    <option value="">Select Year</option>
                    {yearsList?.map(
                      (year: { year: string | number; id: number }) => (
                        <option key={year.id} value={year.year}>
                          {year.year}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      setSelectedValue({
                        ...selectedValue,
                        month: e.target.value,
                      });
                    }}
                    value={selectedValue.month}
                  >
                    <option value="">Select Month</option>
                    {monthsList?.map((month: { name: string; id: number }) => (
                      <option key={month.id} value={month.name}>
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
                    {currentDays?.map((day: any, index: number) => {
                      return (
                        <div
                          className="flex justify-center cursor-pointer"
                          key={index}
                          onClick={() => {
                            setSelectedValue({
                              ...selectedValue,
                              day: day,
                            });
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
    </section>
  );
};

export default SimpleDatePicker;
