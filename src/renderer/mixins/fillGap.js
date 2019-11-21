export default {
  methods: {
    fillGap(list, countPerRow, widthPercentage){
      const rest = countPerRow - list.length % countPerRow
      return rest === 0 ? 0 : (100 - widthPercentage * countPerRow) / (countPerRow - 1) * (rest - 1) + (widthPercentage * rest) + '%'
    }
  }
}
