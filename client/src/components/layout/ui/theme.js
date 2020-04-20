export default {
  name: "Seafoam",
  rounding: 8,
  spacing: 20,
  defaultMode: "light",
  global: {
    colors: {
      brand: {
        dark: "#32e699",
        light: "#32e699",
      },
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      "": {
        dark: "",
        light: "",
      },
      "!": "",
    },
    font: {
      family: '"Roboto"',
      size: "15px",
      height: "20px",
      maxWidth: "300px",
      face:
        "/* cyrillic-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* cyrillic */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* greek-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');\n  unicode-range: U+1F00-1FFF;\n}\n/* greek */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');\n  unicode-range: U+0370-03FF;\n}\n/* vietnamese */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');\n  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;\n}\n/* latin-ext */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "8px",
      },
    },
    drop: {
      border: {
        radius: "8px",
      },
    },
    borderSize: {
      xsmall: "1px",
      small: "2px",
      medium: "3px",
      large: "10px",
      xlarge: "20px",
    },
    breakpoints: {
      small: {
        value: 640,
        borderSize: {
          xsmall: "1px",
          small: "2px",
          medium: "3px",
          large: "5px",
          xlarge: "10px",
        },
        edgeSize: {
          none: "0px",
          hair: "1px",
          xxsmall: "2px",
          xsmall: "3px",
          small: "5px",
          medium: "10px",
          large: "20px",
          xlarge: "40px",
        },
        size: {
          xxsmall: "20px",
          xsmall: "40px",
          small: "80px",
          medium: "160px",
          large: "320px",
          xlarge: "640px",
          full: "100%",
        },
      },
      medium: {
        value: 1280,
      },
      large: {},
    },
    edgeSize: {
      none: "0px",
      hair: "1px",
      xxsmall: "3px",
      xsmall: "5px",
      small: "10px",
      medium: "20px",
      large: "40px",
      xlarge: "80px",
      responsiveBreakpoint: "small",
    },
    input: {
      padding: "10px",
      weight: 600,
    },
    spacing: "20px",
    size: {
      xxsmall: "40px",
      xsmall: "80px",
      small: "160px",
      medium: "320px",
      large: "640px",
      xlarge: "960px",
      xxlarge: "1280px",
      full: "100%",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  button: {
    border: {
      width: "2px",
      radius: "8px",
    },
    padding: {
      vertical: "3px",
      horizontal: "18px",
    },
  },
  checkBox: {
    check: {
      radius: "8px",
    },
    toggle: {
      radius: "8px",
      size: "40px",
    },
    size: "20px",
  },
  radioButton: {
    size: "20px",
    check: {
      radius: "8px",
    },
  },
  calendar: {
    small: {
      fontSize: "11.666666666666666px",
      lineHeight: 1.375,
      daySize: "22.86px",
    },
    medium: {
      fontSize: "15px",
      lineHeight: 1.45,
      daySize: "45.71px",
    },
    large: {
      fontSize: "25px",
      lineHeight: 1.11,
      daySize: "91.43px",
    },
  },
  clock: {
    analog: {
      hour: {
        width: "7px",
        size: "20px",
      },
      minute: {
        width: "3px",
        size: "10px",
      },
      second: {
        width: "3px",
        size: "8px",
      },
      size: {
        small: "60px",
        medium: "80px",
        large: "120px",
        xlarge: "180px",
        huge: "240px",
      },
    },
    digital: {
      text: {
        xsmall: {
          size: "8.333333333333332px",
          height: 1.5,
        },
        small: {
          size: "11.666666666666666px",
          height: 1.43,
        },
        medium: {
          size: "15px",
          height: 1.375,
        },
        large: {
          size: "18.333333333333332px",
          height: 1.167,
        },
        xlarge: {
          size: "21.666666666666668px",
          height: 1.1875,
        },
        xxlarge: {
          size: "28.333333333333336px",
          height: 1.125,
        },
      },
    },
  },
  heading: {
    level: {
      "1": {
        small: {
          size: "28px",
          height: "33px",
          maxWidth: "567px",
        },
        medium: {
          size: "42px",
          height: "47px",
          maxWidth: "833px",
        },
        large: {
          size: "68px",
          height: "73px",
          maxWidth: "1367px",
        },
        xlarge: {
          size: "95px",
          height: "100px",
          maxWidth: "1900px",
        },
      },
      "2": {
        small: {
          size: "25px",
          height: "30px",
          maxWidth: "500px",
        },
        medium: {
          size: "35px",
          height: "40px",
          maxWidth: "700px",
        },
        large: {
          size: "45px",
          height: "50px",
          maxWidth: "900px",
        },
        xlarge: {
          size: "55px",
          height: "60px",
          maxWidth: "1100px",
        },
      },
      "3": {
        small: {
          size: "22px",
          height: "27px",
          maxWidth: "433px",
        },
        medium: {
          size: "28px",
          height: "33px",
          maxWidth: "567px",
        },
        large: {
          size: "35px",
          height: "40px",
          maxWidth: "700px",
        },
        xlarge: {
          size: "42px",
          height: "47px",
          maxWidth: "833px",
        },
      },
      "4": {
        small: {
          size: "18px",
          height: "23px",
          maxWidth: "367px",
        },
        medium: {
          size: "22px",
          height: "27px",
          maxWidth: "433px",
        },
        large: {
          size: "25px",
          height: "30px",
          maxWidth: "500px",
        },
        xlarge: {
          size: "28px",
          height: "33px",
          maxWidth: "567px",
        },
      },
      "5": {
        small: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
        medium: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
        large: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
        xlarge: {
          size: "13px",
          height: "18px",
          maxWidth: "267px",
        },
      },
      "6": {
        small: {
          size: "12px",
          height: "17px",
          maxWidth: "233px",
        },
        medium: {
          size: "12px",
          height: "17px",
          maxWidth: "233px",
        },
        large: {
          size: "12px",
          height: "17px",
          maxWidth: "233px",
        },
        xlarge: {
          size: "12px",
          height: "17px",
          maxWidth: "233px",
        },
      },
    },
  },
  paragraph: {
    small: {
      size: "13px",
      height: "18px",
      maxWidth: "267px",
    },
    medium: {
      size: "15px",
      height: "20px",
      maxWidth: "300px",
    },
    large: {
      size: "18px",
      height: "23px",
      maxWidth: "367px",
    },
    xlarge: {
      size: "22px",
      height: "27px",
      maxWidth: "433px",
    },
    xxlarge: {
      size: "28px",
      height: "33px",
      maxWidth: "567px",
    },
  },
  text: {
    xsmall: {
      size: "12px",
      height: "17px",
      maxWidth: "233px",
    },
    small: {
      size: "13px",
      height: "18px",
      maxWidth: "267px",
    },
    medium: {
      size: "15px",
      height: "20px",
      maxWidth: "300px",
    },
    large: {
      size: "18px",
      height: "23px",
      maxWidth: "367px",
    },
    xlarge: {
      size: "22px",
      height: "27px",
      maxWidth: "433px",
    },
    xxlarge: {
      size: "28px",
      height: "33px",
      maxWidth: "567px",
    },
  },
  scale: 1,
  formField: {
    border: {
      color: "border",
      error: {
        color: {
          dark: "white",
          light: "status-critical",
        },
      },
      position: "inner",
      side: "bottom",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    label: {
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    margin: {
      bottom: "small",
    },
    round: "8px",
  },
  layer: {
    background: {
      dark: "#111111",
      light: "#FFFFFF",
    },
  },
};
