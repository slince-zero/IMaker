<p align="center">
  <img src="/public/favicon.png" alt="favicon">
</p>
<h1 align="center"> IMaker </h1>
<a href="/READMECN.md">中文</a>

## Intro

Imkaer is a tool designed for creating covers, allowing you to design your own favorite covers for your blog, videos, WeChat Public Account, and more.

## Preview

![intro](/public/intro.png)

## Deployment

🌟 Step 1: Create a file named "`.env.local`" and change the `VITE_PUBLIC_UNSPLASH_API_KEY` in `.env.local`

    VITE_PUBLIC_UNSPLASH_API_KEY = your_unsplash_api_key

[https://unsplash.com/documentation](https://unsplash.com/documentation)

💥 Step 2: change the `VITE_PUBLIC_HUGGINGFACE_API_KEY` in `.env.local`

    VITE_PUBLIC_HUGGINGFACE_API_KEY = your_huggingface_api_key

[https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

🌈 Step 3: Clone the project

    git clone git@github.com:slince-zero/IMaker.git
    cd img-maker
    npm i
    npm run dev

Open http://localhost:5173 to see the effect.

## New Features

- Generate image by AI 🔥

## Contributing

If you have any suggestions or feedback, please feel free to contribute to the project.

1. Fork the repository
2. Create a new branch (e.g. `feature/new-feature`)
3. Make your changes and commit them (e.g. `git commit -m "Add new feature"`)
4. Push to the branch (e.g. `git push origin feature/new-feature`)
5. Create a pull request

## License

GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
