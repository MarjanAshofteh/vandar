export const NationalCodeValidator = (value, component) => {
  var numbers = value.split('')
  if(numbers.length < 10) return false
  var sum = 0
  for(var i = 10; i > 1; i--){
    sum += (numbers[10-i] * i)
  }
  var r = sum % 11
  if(r >= 2 && r == (11 - numbers[9]) || r < 2 && r == numbers[9])
    return true
  return false
}
