import Block from "../../core/Block";

export default class ProfileImage extends Block {
    render() {
        return (
            `
                <div class="profile-image">
                    <img src="https://ya-praktikum.tech/api/v2/resources/{{profileImage}}" alt="Изображение" />
                    <div class="text">Поменять аватар</div>
                </div>
            `
        );
    }
}
