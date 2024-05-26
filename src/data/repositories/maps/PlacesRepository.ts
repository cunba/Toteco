export class PlacesRepository {
    static tries = 0

    constructor() { }

    async getPlacesNearby() {
        try {
            // const response = await new PlacesClient().searchNearby();
            // console.log(response);
            // return response
        } catch (e) {
            if (PlacesRepository.tries < 1) {
                PlacesRepository.tries++
                this.getPlacesNearby()
            } else {
                PlacesRepository.tries = 0
                console.log(e)
                throw e
            }
        }
    }
}