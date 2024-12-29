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
        logger()->info('CustomFakerServiceProvider registered');
        $this->app->singleton(FakerGenerator::class, function () {
            $faker = FakerFactory::create();

            // Remove the default Image provider
            foreach ($faker->getProviders() as $index => $provider) {
                if ($provider instanceof \Faker\Provider\Image) {
                    unset($faker->getProviders()[$index]);
                }
            }

            $faker->addProvider(new CustomImageProvider($faker));

            return $faker;
        });

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
