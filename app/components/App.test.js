var myBeverage = {
  delightful: true,
  name: 'Lemonade',
  too_sweet: false
}

describe('my beverage', () => {
  it('is delightful', () => {
    expect(myBeverage.delightful).toBeTruthy();
  });
  it('is lemonade', () => {
    expect(myBeverage.name).toEqual('Lemonade');
  });
  it('is not too sweet', () => {
    expect(myBeverage.too_sweet).toBeFalsy();
  })
})