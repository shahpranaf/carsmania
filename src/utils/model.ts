interface Mileage {
    number: number
    unit: string
}

export interface Car {
    color: string
    fuelType: string
    manufacturerName: string
    mileage: Mileage
    modelName: string
    pictureUrl: string
    stockNumber: number
}