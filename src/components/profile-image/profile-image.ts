import Block from "../../core/Block";

export default class ProfileImage extends Block {
    render() {
        return (
            `
                <div class="{{#if chat}}chat{{/if}} profile-image">
                    <img src="{{#if profileImage}}
                        https://ya-praktikum.tech/api/v2/resources/{{profileImage}}
                        {{else}}{{defaultImg}}{{/if}}" alt="Изображение" />
                    <div class="text">Поменять аватар</div>
                </div>
            `
        );
    }
}
