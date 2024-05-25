import {ScrollView, Text, Image, View} from 'react-native';
import React from 'react';
import {
  BackGroundComponent,
  CustomLoginHeaderComponent,
} from '../../components';

type Props = {};

const ArtistDetailScreen = (props: Props) => {
  return (
    <BackGroundComponent notTranslucent>
      <ScrollView>
        <CustomLoginHeaderComponent plaintext="Arjun Kanungo" />
        <View className="mx-auto w-[90%] mt-5 h-[350]">
          <Image
            source={require('../../projectAssets/todayHits.jpg')}
            className="object-fit h-[100%] w-[100%] rounded-lg"
          />
        </View>
        <View className="w-[95%] mx-auto">
          <Text className="text-text text-4xl font-extrabold mt-5 ">
            4,509,073
          </Text>
          <Text className="text-text  ">MONTHLY LISTENERS</Text>
          <Text className=" mx-auto  text-secondary leading-5 mt-7 mb-4 ">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim nemo
            perferendis accusantium molestiae maxime voluptas quasi saepe
            laboriosam id numquam deleniti molestias, in quibusdam debitis
            praesentium aut nisi incidunt dolore exercitationem esse repudiandae
            error quam. In quae consectetur iure, consequatur aspernatur odit
            quasi ipsum sint, rerum vero nam odio. Doloremque inventore rem,
            veritatis sequi omnis sit odit, doloribus repellat saepe placeat
            laborum voluptatibus beatae fuga minima repudiandae excepturi, ea
            ratione obcaecati dolore! Fugiat fuga inventore asperiores, odit et,
            eum hic consequuntur eligendi quaerat porro, sunt sequi. Rerum velit
            praesentium sed quae perferendis esse a quis quo consequuntur.
            Libero, asperiores delectus quasi labore exercitationem quia
            cupiditate laboriosam maxime molestias necessitatibus quibusdam
            dolorem laudantium adipisci soluta maiores? Reprehenderit dolor
            distinctio atque delectus ipsum necessitatibus voluptatem at
            repellendus deleniti consequatur velit similique eveniet
            consequuntur iusto alias ducimus voluptates debitis corrupti
            excepturi impedit illo, sint numquam? Laboriosam quos debitis veniam
            amet porro expedita qui quam veritatis, tempora autem eius Nobis,
            alias, cumque inventore quas facere quidem non rerum eaque molestias
            fugiat minus libero quae provident explicabo. Tempore quae maxime
            cum, ipsum neque quos dolore. Eveniet possimus, hic ipsum
            dignissimos perferendis provident sint aliquam esse, laborum, dolore
            ea voluptate culpa illo consectetur natus distinctio. Nostrum
            inventore beatae placeat magnam hic quidem, sit est repellat ad
            sapiente aliquid aliquam nihil perspiciatis consequuntur, in
            similique quasi id odio quae pariatur optio delectus, neque
            perferendis incidunt. Eum veniam optio facere repudiandae ipsa
            quibusdam dicta. Tenetur iusto qui debitis odio, sint labore
            provident illum quisquam voluptatum, in, nemo error voluptate non.
            Architecto minima modi doloribus aut, inventore sunt culpa facilis
            rerum voluptate aperiam suscipit ducimus deleniti consectetur atque
            quod, sit maxime impedit assumenda pariatur porro. Esse, praesentium
            modi quibusdam, at ea nulla nihil, adipisci consequatur perferendis
            corrupti error quasi deserunt distinctio amet alias ratione
            doloribus exercitationem expedita. Incidunt at sed cupiditate
            commodi dolores repudiandae sint non sunt obcaecati assumenda,
            maxime nam. Numquam, fugit. Officiis quasi quaerat fugiat quos
            voluptatem nam aliquam ex unde? Qui atque ratione, repellat eum
            incidunt et modi delectus, odit sit sequi velit.
          </Text>
          <View className="mb-20 flex-row gap-5 items-center">
            <Image
              source={require('../../projectAssets/todayHits.jpg')}
              className="w-8 h-8 rounded-full"
            />
            <Text className="text-secondary">Posted by Arjun Kanungo </Text>
          </View>
        </View>
      </ScrollView>
    </BackGroundComponent>
  );
};

export default ArtistDetailScreen;
