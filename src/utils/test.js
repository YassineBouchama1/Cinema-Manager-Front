
export function cnCustom(...arg) {




    return arg.filter((i) => typeof i !== 'object').join(' ')?.toString()

}

