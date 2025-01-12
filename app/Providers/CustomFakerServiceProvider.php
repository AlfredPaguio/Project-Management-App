<?php

namespace App\Providers;

use Faker\Factory as FakerFactory;
use Faker\Generator as FakerGenerator;
use Illuminate\Support\ServiceProvider;
use App\Faker\CustomImageProvider;

class CustomFakerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(FakerGenerator::class, function () {
            $faker = FakerFactory::create();
            $faker->addProvider(new CustomImageProvider($faker));
            // $providers = array_map(fn($provider) => get_class($provider), $faker->getProviders());
            // logger()->info('List of Providers registered: ' . implode(', ', $providers));
            return $faker;
        });

        // thank you very much, I was able to solve the problem with the help of this article
        // Laravel defaults to the basic instance of Faker\Generator (so without my custom provider) from its service container
        // so I need to bind my custom instance of Faker\Generator (above code) to the service container
        // https://gdebrauwer.dev/blog/how-to-customize-php-faker-in-laravel/
        $this->app->bind(\Faker\Generator::class . ':' . config('app.faker_locale'), \Faker\Generator::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
