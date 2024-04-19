import Block from "../../core/Block";

export default class ProfileImage extends Block {
    render() {
        return (
            `
                <div class="profile-image">
                    <img src="{{profileImage}}" alt="Изображение" />
                    <div class="text">Поменять аватар</div>
                </div>
            `
        );
    }
}
