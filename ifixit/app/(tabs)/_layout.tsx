import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/TabBarIcon";
import { TabBarAccount } from "@/components/TabBarAccount";

const lightBlue = '#ADD8E6'; // Define el color celeste suave

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false, // Desactiva el encabezado si no es necesario
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            name={focused ? 'home' : 'home-outline'}
                            color={focused ? lightBlue : undefined}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabBarAccount
                            name={focused ? 'person' : 'person-outline'}
                            color={focused ? lightBlue : undefined}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
